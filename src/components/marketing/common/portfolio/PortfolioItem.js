// import node module libraries
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import bootstrap icons
import { ArrowUpRight } from 'react-bootstrap-icons';

const PortfolioItem = props => {
    const { item } = props;
    return (
        <div className="mb-6" >
            {/*  portfolio image  */}
            <div className="img-overlay ">
                <div className="img-color ">
                    <Link to={item.link}>
                        <Image src={item.image} alt="portfolio" className="img-fluid w-100" />
                    </Link>
                    <div className="caption">
                        <Link to={item.link} className="btn btn-white  ">View Details</Link>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {/*  text  */}
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="fw-semibold mb-1">
                        <Link to={item.link} className="text-inherit">{item.title}</Link>
                    </h3>
                    <Link to={item.link}><ArrowUpRight size={14} fill="currentColor" /></Link>
                </div>
                <span>{item.category}</span>
            </div>
        </div>
    )
}

export default PortfolioItem