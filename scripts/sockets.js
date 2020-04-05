const database = require('../database/database.js');
const kusto = require('./kusto.js');

class Sockets {

    io = undefined;
    online = [];
    
    constructor(server){
        this.io = require('socket.io')(server);
        this.handleConnections();
    }

    refreshSegments = async () => {
        const updatedSegments = await database.getSegmentsWithoutAPIKey();
        this.io.emit('getSegments', updatedSegments);
    }

    handleConnections = () => {

        this.io.on("connection", socket => {

            // Handle disconnection - remove all selections of the dc'd user
            socket.on("disconnect", async () => {
                // Remove segment selections
                await database.handleUserDisconnection(socket.name);

                // Remove from online users list
                this.online.splice(this.online.indexOf(socket.name), 1);
                socket.broadcast.emit('userStatus', socket.name, 'out');

                // Send updated segments to all connected users
                this.refreshSegments();
            });

            // Handle 'login', the first emmission by every connected socket
            socket.on('login', async username => {
                const name = await database.usernameToName(username);
                socket.name = name;

                // A new user has connected, add him to the online users list
                if (this.online.indexOf(name) == -1){
                    this.online.push(name);
                    socket.broadcast.emit('userStatus', name, 'in');
                    const {affiliates, suppliers} = await kusto.getAffiliatesSuppliers();
                    socket.emit('getAffiliatesSuppliers', affiliates, suppliers);
                }
            });

            // Handle segment selection/deselection
            socket.on('toggleSelection', async segmentID => {
                const currentState = await database.getSegmentValueAtKey(segmentID, 'currentlyHandledBy');
                const newState = currentState == undefined ? socket.name : undefined;
                const updatedSegment = await database.updateAndReturnSegment(segmentID, {currentlyHandledBy: newState});

                // Update all connected clients
                this.io.emit('select', segmentID, updatedSegment.currentlyHandledBy);
            });

            socket.on('update', segmentIDs => this.io.emit('update', segmentIDs));

            socket.on('getReporterSegments', async (date, affiliate, supplier, status) => {

                // Get plotting data
                const segments = await database.getPlotSegments(date, affiliate, supplier, status);

                // Return to requester
                socket.emit('getReporterSegments', segments);
            });

            socket.on('getErrorInfo', async (stage, service, affiliate, supplier, date, error) => {

                // Get data
                const data = await kusto.getErrorInfo(stage, service, affiliate, supplier, date, error);

                // Return to requester
                socket.emit('getErrorInfo', data);
            });

            socket.on('plot', async (affiliate, supplier, status) => {

                // Get plotting data
                const {dates, suppliersWithBookings} = await database.getPlotData(affiliate, supplier, status);

                // Return to requester
                socket.emit('plot', dates, suppliersWithBookings);
            });

            socket.on('plotTransactions', async (stage, service, affiliate, supplier, date) => {

                // Get plotting data
                const data = await kusto.getTransactions(stage, service, affiliate, supplier, date);

                // Return to requester
                socket.emit('plotTransactions', data);
            });

            socket.on('plotSBRB', async (affiliate, supplier, type, date) => {

                // Get plotting data
                const data = await kusto.getSmartbookRebook(affiliate, supplier, type, date);

                // Return to requester
                socket.emit('plotSBRB', data);
            });
        });
    }
}

module.exports = Sockets;