// import node module libraries
import React, { Fragment, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// import layouts and assets
import NavbarMegaMenu from 'layouts/marketing/navbars/mega-menu/NavbarMegaMenu';
import CertificateTemplate from 'assets/images/certificate/certificate.png';

const Certificate = () => {
	const certificateRef = useRef(null);

	const certificateDetails = {
		id: "123",
		name: 'Test Student',
		certificationDate: 'July 2, 2024',
		certificationTitle: 'Business Management- Startups'
	};

	const verificationLink = `https://emergelms.vercel.app/certificate/${certificateDetails.name}/${certificateDetails.id}`;

	// Function to download the certificate as a PDF
	const downloadPDF = () => {
		const certificateElement = certificateRef.current;

		html2canvas(certificateElement).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('landscape');
			pdf.addImage(imgData, 'PNG', 10, 10, 280, 190);
			pdf.save(`${certificateDetails.name}-certificate.pdf`);
		});
	};

	return (
		<Fragment>
			<NavbarMegaMenu />
			<div className="download">
				<button onClick={downloadPDF} style={{ border: 'none', borderRadius: '5px', textDecoration: 'none', color: '#fff', backgroundColor: '#754FFE' }}>Download as PDF</button>
			</div>
			<div className='certificate-container'>
				
				<div className='certificate' ref={certificateRef}>
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
						<QRCodeCanvas value={verificationLink} size={80} />
					</div>

					<div className='verify-link'>
						<a href={verificationLink}>
							Verify this certification at {verificationLink}
						</a>
					</div>
				</div>

			</div>
		</Fragment>
	);
};

export default Certificate;
