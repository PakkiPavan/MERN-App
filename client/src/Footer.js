import React from 'react';
import './App.css';
import India from './images/India.PNG';

class Footer extends React.Component
{
    render()
    {
        return(
            <div className="footer">
					<span className="copyrights">
						<img src={India} alt="India" style={{height:'30px',width:'40px',float:'left',marginRight:'5px'}} />
						Copyrights &copy; Pakki Pavan 2019
					</span>
			</div>
        )
    }
}
export default Footer;