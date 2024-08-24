import React from 'react';

// import "../App.css"; schoolInfo Component Template
function SchoolInfo({}) {
    return (
        <div className="pagesContainer box">
            <div className="InfoSection purpose">
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
                    courses or suspending studies.]
                    <a href="#2">
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
                <div className="additionalInfo">
                    <p>[In recent years, rates of attendance in 2-year institutions have soared with
                        43% of American undergraduates beginning their educational trajectory at a
                        community college.] <a href="#3">
                        <sup>(3)</sup>
                    </a></p>
                    <p>Yet, 22.6% of U.S. undergraduate students report food
                        insecurity—approximately 3.9 million students. This is more than double the food
                        insecurity rate among all U.S. households at 10.5%.
                        <sup>1029 - 20 National Center for Education Statistics</sup>
                        <a href="#4">
                        (4)
                    </a></p>
                </div>
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
            </div>

        </div>
    );
}

export default SchoolInfo;