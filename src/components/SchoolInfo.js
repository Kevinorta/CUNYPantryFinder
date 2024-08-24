import React from 'react';
//schoolInfo Component Template
/*
  schoolName: {
  centerName: {
  centerInfo: {
  centerHours: {
  email: {
  phone: {
  appointmentRequired: {
  appointmentLink: {
  informationLink: {
  additionalInfo: {
  cunywide: {
*/
function SchoolInfo({
    className,
    schoolName,
    centerName,
    centerInfo,
    email,
    phone,
    appointmentRequired,
    appointmentLink,
    informationLink,
    centerHours,
    cunywide,
    additionalInfo
}) {
    return (
        <div className={className}>
           <h1 className="school-name">{schoolName}</h1>
           <h2 className="center-name">{centerName}</h2>
           <p className="center-info">
               <strong> Location: </strong>{centerInfo}
           </p>
           <p className="contact-info">
               <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
           </p>
           <p className="phone-info">
               <strong>Phone: </strong>{phone}
           </p>
           <p className="hours-info">
               <strong>Hours: </strong>{centerHours}
           </p>
           
           <p className="appointment-info" >{additionalInfo}</p>    
           <a href={informationLink} target="_blank" rel="noreferrer" className="more-info-link">
               <p>Additional Information About Pantry</p>
           </a>
          
       </div>
    );
}

//creating all schoolInfo component from data
{/* TODO: Filter  */}
{/* TODO: Change highlighting to schoolName not index  */}

export const renderSchoolInfo = (sortedSchools, hoveredMarkerName, filters) => {
    return sortedSchools.filter((school) => {
        if (filters.WalkIn && school.appointmentRequired) return false;
        if (filters.CunyWide && !school.cunywide ) return false
        return true
      }).map((data, index) => (<SchoolInfo
        className = {hoveredMarkerName == data.schoolName ? "InfoSection-hover" : "InfoSection"}
        key={index}
       schoolName={data.schoolName}
       centerName={data.centerName}
       centerInfo={data.centerInfo}
       email={data.email}
       phone={data.phone}
       centerHours={data.centerHours}
       appointmentRequired={data.appointmentRequired}
       cunywide={data.cunywide}
       additionalInfo={data.additionalInfo}
       appointmentLink={data.appointmentLink}
       informationLink={data.informationLink}
       />));
};

export default SchoolInfo;