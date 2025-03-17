import React from 'react';

const Contact = () => {
  return (
    <div className="about" id="contact">
      <p className="contact_title">Contact Us</p>

      <div className="about_box_div">
        <div className="about_box">
          <span className="contact_source">Leader<br /></span>
          <span className="contact_item"> 조윤제 <span style={{ fontSize: "0.9em" }}>(010-9788-9498)</span></span>
        </div>

        <div className="about_box">
          <span className="contact_source">Location<br /></span>
          <span className="contact_item"> 경북대학교 청룡관 103</span>
        </div>
      </div>

      <div className="about_box_div">
        <div className="about_box">
            <span className="contact_source">Kakao<br /></span>
            <a href="https://open.kakao.com/o/sQhkZJkh" className="contact_item_link">@KNUPI </a>
          </div>

          <div className="about_box">
            <span className="contact_source">Instagram<br /></span>
            <a href="https://www.instagram.com/knupi_official/" className="contact_item_link">@knupi_official </a>
          </div>
        </div>
    </div>
  );
};

export default Contact;
