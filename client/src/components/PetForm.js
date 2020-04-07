import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'
import $ from 'jquery'
import cities from './cities-list'

export class PetForm extends Component {

    constructor(props){
        super(props)
        this.submitRef = React.createRef()
    }

    state = {}

    submit = e => {
        e.preventDefault();
        this.submitRef.current.disabled = true
        const form = this.state
        this.props.submit(form)
    }

    render() {
        return (
            <div>
                <h3 className="my-4 text-center">בקשה לאימוץ ואומנת כלבים</h3>
                <div className="description">
                    <p>
                        אנו מודים לכם על ההרתמות למשימה החשובה של הצלת בעלי חיים <FeatherIcon size="19" icon="smile" /><br/>
                        שאלון זה נועד לייעל את התהליך עם העמותות אליהן אנו מעבירים את הפרטים.<br/>
                    </p>
                    <p style={{marginTop: '2%'}}>
                        <FeatherIcon icon="chevron-left" />
                        ככל שבחירתכם תהיה מצומצת - כך ייקח זמן רב יותר למצוא התאמה.<br/>
                        לשם דוגמה, משפחה המעוניינת לאמץ רק גורים, תחכה זמן רב הרבה יותר מאשר משפחה שגיל הכלב לא משנה לה.<br/><br/>

                        <FeatherIcon icon="chevron-left" />
                        שימו לב שכל המתנדבים עושים זאת בזמנים הפנוי, לכן התהליך עלול לקחת מעט זמן, אך בכל זאת, אתם מוזמנים לפנות אלינו אם אתם מרגישים ששכחו אתכם.<br/>
                    </p>
                    <p>
                        תודה, ואנו מקווים שתמצאו בן משפחה חדש בקרוב!<br/>
                        <a href="https://www.facebook.com/rrotberg" rel="noopener noreferrer" target="_blank">רוני</a>&nbsp;<FeatherIcon size="15" style={{fill: 'red', color: 'black'}} icon="heart" />
                    </p>
                </div>
                <form onSubmit={this.submit} className="d-flex justify-content-center align-items-center flex-column mt-4">

                    {/* Name */}
                    <div className="form-group text-center">
                        <label>שם מלא</label>
                        <input required onChange={e => this.setState({name: e.target.value})} type="text" className="form-control-sm form-control" />
                    </div>

                    {/* Age */}
                    <div className="form-group text-center">
                        <label>גיל</label>
                        <input required onChange={e => this.setState({age: e.target.value})} min="8" max="120" type="number" className="form-control-sm form-control" />
                    </div>

                    {/* Region */}
                    <div className="form-group text-center">
                        <label>איזור מגורים</label>
                        <select required onChange={e => this.setState({region: e.target.value})} className="form-control-sm form-control">
                            <option selected disabled value="">איזור</option>
                            <option>מרכז</option>
                            <option>צפון</option>
                            <option>דרום</option>
                            <option>יהודה ושומרון</option>
                        </select>
                    </div>

                    {/* City */}
                    <div className="form-group text-center">
                        <label>עיר מגורים</label>
                        <select required onChange={e => this.setState({city: e.target.value})} className="form-control-sm form-control">
                            <option selected disabled value="">עיר</option>
                            {cities.map(city => <option key={city}>{city}</option>)}
                        </select>
                    </div>

                    {/* Type of house */}
                    <div className="form-group text-center">
                        <label>סוג דירה</label>
                        <select required onChange={e => this.setState({houseType: e.target.value})} className="form-control-sm form-control">
                            <option selected disabled value="">סוג דירה</option>
                            <option>דירה עם גג או חצר מתוחמים</option>
                            <option>דירה עם גג או חצר לא מתוחמים</option>
                            <option>דירה ללא גג או חצר</option>
                        </select>
                    </div>

                    {/* Phone Number */}
                    <div className="form-group text-center">
                        <label>טלפון</label>
                        <input required onChange={e => this.setState({phone: e.target.value})} type="number" className="form-control-sm form-control" />
                    </div>

                    {/* 2nd Phone Number */}
                    <div className="form-group text-center">
                        <label>טלפון נוסף (כדאי!)</label>
                        <input onChange={e => this.setState({phone2: e.target.value})} type="number" className="form-control-sm form-control" />
                    </div>

                    {/* Who's living in the house? */}
                    <div className="form-group text-center">
                        <label>מי חי בבית?</label>
                        <select required onChange={e => this.setState({residents: e.target.value})} className="form-control-sm form-control">
                            <option selected disabled value="">סוג דיירים</option>
                            <option>יחיד</option>
                            <option>זוג</option>
                            <option>שותפים</option>
                            <option>משפחה עם ילדים מעל לגיל 5</option>
                            <option>משפחה עם ילדים מתחת לגיל 5</option>
                        </select>
                    </div>

                    {/* Experience with dogs */}
                    <div className="form-group text-center">
                        <label>נסיון עם כלבים</label>
                        <select required onChange={e => this.setState({experience: e.target.value})} className="form-control-sm form-control">
                            <option selected disabled value="">נסיון</option>
                            <option>מנוסה</option>
                            <option>לא מנוסה</option>
                        </select>
                    </div>

                    {/* Adoption time period */}
                    <div className="form-group text-center">
                        <label>אימוץ או אומנה?</label>
                        <select required onChange={e => this.setState({timePeriod: e.target.value})} className="form-control-sm form-control">
                            <option selected disabled value="">פרק זמן</option>
                            <option>אומנה</option>
                            <option>אימוץ</option>
                            <option>אומנה, עם אפשרות לאמץ</option>
                        </select>
                    </div>

                    {/* Dog's gender */}
                    <div className="form-group text-center">
                        <label>מין מועדף</label>
                        <select required onChange={e => this.setState({gender: e.target.value})} className="form-control-sm form-control">
                            <option selected disabled value="">מין</option>
                            <option>לא משנה</option>
                            <option>זכר</option>
                            <option>נקבה</option>
                        </select>
                    </div>

                    {/* Other pets */}
                    <div className="form-group text-center">
                        <label>יש עוד חיות בבית? (ניתן לסמן כמה)</label>
                        <select multiple required onChange={e => this.setState({pets: $(e.target).val()})} className="form-control-sm form-control">
                            <option>כלב</option>
                            <option>חתול</option>
                            <option>אחר</option>
                        </select>
                    </div>

                    {/* Dog's size */}
                    <div className="form-group text-center">
                        <label>גודל מועדף (ניתן לסמן כמה)</label>
                        <select multiple required onChange={e => this.setState({size: $(e.target).val()})} className="form-control-sm form-control">
                            <option>לא משנה</option>
                            <option>קטן</option>
                            <option>בינוני</option>
                            <option>גדול</option>
                        </select>
                    </div>

                    {/* Dog's age */}
                    <div className="form-group text-center">
                        <label>גיל מועדף (ניתן לסמן כמה)</label>
                        <select multiple required onChange={e => this.setState({dogAge: $(e.target).val()})} className="form-control-sm form-control">
                            <option>לא משנה</option>
                            <option>גור</option>
                            <option>צעיר</option>
                            <option>בוגר</option>
                            <option>מבוגר</option>
                        </select>
                    </div>

                    {/* Comments */}
                    <div className="form-group text-center">
                        <label>הערות ובקשות</label>
                        <input onChange={e => this.setState({comments: e.target.value})} type="text" className="form-control-sm form-control"/>
                    </div>

                    {/* Submit Form */}
                    <button ref={this.submitRef} type="submit" className="btn btn-secondary mt-2 mb-3">
                        שלח
                    </button>
                </form>
            </div>
        )
    }
}

export default PetForm