// import node module libraries
import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// import QRCode component
import { QRCodeCanvas } from 'qrcode.react';

// import layouts and assets
import NavbarMegaMenu from 'layouts/marketing/navbars/mega-menu/NavbarMegaMenu';
import courseService from '../../dashboard/features/courses/courseService';
import CertificateTemplate from 'assets/images/certificate/certificate.png';

const Certificate = () => {
  const { user } = useSelector((state) => state.auth);
  const token = user?.data?.accessToken;
  const studentData = JSON.parse(localStorage.getItem('studentData'));

  const certificateDetails = {
    name: 'Test Student',
    certificationDate: 'July 2, 2024',
    certificationTitle: 'Business Management- Startups',
    verificationLink: 'https://emergelms.vercel.app/certificate/Daniel-Musunza/123',
  };

  return (
    <Fragment>
      <NavbarMegaMenu />
      <div className='certificate-container'>
        <div className='certificate'>
          <img src={CertificateTemplate} alt="Certificate" />

          <div className='certification-date'>
            <span>Issued </span>
            <p>{certificateDetails.certificationDate}</p>
          </div>

          <div className='certified-name'>
            <h2>{certificateDetails.name}</h2>
          </div>
          <div className='certification'>
            <h2>{certificateDetails.certificationTitle}</h2>
          </div>

          <div className='qr-code'>
            <QRCodeCanvas value={certificateDetails.verificationLink} size={80} />
          </div>

          <div className='verify-link'>
            <a href={certificateDetails.verificationLink}>
              Verify this certification at {certificateDetails.verificationLink}
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Certificate;
