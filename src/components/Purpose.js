import React from 'react';
import purposeSurvey from "../assets/purposeSurvey.png";
import purposeCovid from "../assets/purposeCovid.png";

// import "../App.css"; schoolInfo Component Template
function SchoolInfo({}) {
    return (
        <div className="pagesContainer box">
            <div className="purposeSection">
                <h1 className="title">How does food insecurity impact students?</h1>
                {/* TODO: Add sup tags to nums and a tags to reference */}
                <p>“Food insecure college students are at a greater risk of experiencing lower
                    grades and retention rates, more housing insecurity, greater weight gain, and
                    less healthy diets.”
                    <a href="#1">
                        <sup>(1)</sup>
                    </a><br/>
                    [Growing evidence shows that food insecure students tend to have lower GPAs,
                    face difficulty studying, and have an increased likelihood of withdrawing from
                    courses or suspending studies.]<a href="#2">
                        <sup>(2)</sup>
                    </a>
                </p>

                <h1 className="title">What does CUNY do to combat food insecurity?</h1>
                <p>CUNY CARES (Comprehensive Access to Resources for Essential Services) is a
                    program connecting CUNY students to health care, mental health, food, and
                    housing services with goals to improve academic success and overall well-being
                    of students.</p>
                <p>Healthy CUNY is an initiative that sponsors health communications campaigns;
                    advocates for policies and programs that promote the well-being of the CUNY
                    community.</p>
                <p>The CUNY Urban Food Policy Institute works with communities, governments,
                    businesses, and social movements to tackle poverty, racism, and inequality, the
                    drivers of food inequities through conducting research, policy analysis,
                    advocacy and education.</p>
                <div className="sources">
                    <ol>
                        <li id="1">
                            <a
                                className="sourceLinks"
                                target="_blank"
                                href="https://compass.onlinelibrary.wiley.com/doi/10.1111/spc3.12753">Examining
                                college students' food security coping strategies and experiences during the
                                COVID-19 pandemic</a>
                        </li>
                        <li id="2">
                            <a
                                className="sourceLinks"
                                target="_blank"
                                href="https://cunyurbanfoodpolicy.org/wp-content/uploads/2022/04/CUNY-UFPI_food-security_v07_Final.pdf">The State of Food Security at CUNY in 2020</a>
                        </li>
                        <li id="3">
                            <a
                                className="sourceLinks"
                                target="_blank"
                                href="https://onlinelibrary.wiley.com/doi/full/10.1002/pa.1891">Hungry
                                minds: Investigating the food insecurity of minority community college students</a>
                        </li>
                        <li id="4">
                            <a className="sourceLinks" target="_blank" href="https://hope.temple.edu/npsas">New
                                Federal Data Confirm that College Students Face Significant—and
                                Unacceptable—Basic Needs Insecurity</a>
                        </li>
                    </ol>
                </div>
                <div class="row">
                    <div class="column">
                        <img
                            className="statImage"
                            src={purposeSurvey}
                            title="Poverty and Academic Problems Among Students reporting Food Insecurity, Healthy CUNY Fall 2018"></img>
                        <p className="caption">Food insecurity among CUNY students rose from 2018 to 2020</p>
                    </div>
                    <div class="column">
                        <img
                            className="statImage"
                            src={purposeCovid}
                            title="Comparison of rates of Food Insecurity in 2018 and 2020 (After CovId-19)"></img>
                        <p className="caption">Students from higher-poverty neighborhoods and lower GPAs are more likely to experience academic challenges.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SchoolInfo;