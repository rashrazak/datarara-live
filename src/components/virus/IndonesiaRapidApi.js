import React, {useState,useEffect} from 'react'
import moment from 'moment'
import 'moment/locale/id'
// import convertToRupiah from '../../config/convertToRupiah'

function IndonesiaRapidApi() {
    const [countryData, setCountryData] = useState([])
    // const [provinsiData, setProvinsiData] = useState([])
    const [latestNews, setLatestNews] = useState([])
    const [slides, setSlides] = useState(1)

    useEffect(() => {
        const getCountryData = async ()=> {
            if (countryData.length == 0) {
                var currentDate = new Date();
                for (let index = 3; index >= 0; index--) {
                    var periodDate = moment(currentDate).subtract(index, 'days')
                    await fetch(`https://covid-193.p.rapidapi.com/history?day=${moment(periodDate).format('YYYY-MM-DD')}&country=indonesia`, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "covid-193.p.rapidapi.com",
                            "x-rapidapi-key": "82b8e9ace9msh0cbd40e0c5ccadbp1b71c7jsn5bd545367d28"
                        }
                    })
                    .then(response => {
                            response.json().then(data => {
                                console.log(data)
                               setCountryData(x => [data,...x ])
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    
                }
                
            }else{
                console.log(countryData)
            }
        }
        getCountryData()
    }, [countryData])
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSlides(x => {
                return x == 3? 0 : ++x
             })
        }, 5000);
    
        return () => {
          clearInterval(interval);
        };
      }, []);
    return (
        <div>
            {
                slides == 1 && countryData.length > 0 ?
                <div>
                    <h1>Kasus Covid-19</h1>
                    {
                        countryData.map( (v,i) => {
                            return(
                                <div key={i}>
                                    <p>Tarikh: {moment(v.parameters.day).locale('id').format('Do MMMM YYYY')}</p>
                                    {
                                        v.results == 0 ?
                                        <div>
                                            <h5>Data Masih belum tersedia</h5>
                                        </div>
                                        :
                                        <div>
                                            {
                                                v.response ? 
                                                <ul>
                                                    <li>Total Test:{v.response[0].tests.total} </li>
                                                    <li>
                                                        Kasus baru: {v.response[0].cases.new} / Total kasus:{v.response[0].cases.total}
                                                        <ul>
                                                            <li>Aktif: {v.response[0].cases.active}</li>
                                                            <li>Sembuh: {v.response[0].cases.recovered}</li>
                                                            <li>Mati Baru:{v.response[0].deaths.new} / Mati total: {v.response[0].deaths.total}</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                                :
                                                'Loading...'
                                            }
                                            
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div> 
                : slides == 2 && latestNews.length == 0 ?
                <div>
                    <h1>News</h1>
                </div>
                : slides == 3 ?
                <div>
                    <h1>Nongkrong</h1>
                </div>
                :''
            }
            
        </div>
    )
}

export default IndonesiaRapidApi
