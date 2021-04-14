import React from 'react';
import { SeparatorLine } from '../../_common/components/separator_line.jsx';

const WelcomePage = () => {

    const dropdown = 'images/pages/welcome/ddown.svg';
    const options = [
        {
            icon_list: ['images/pages/welcome/cfd.svg'],
            title    : it.L('CFD'),
            desc     : it.L('<strong>Maximise returns</strong> by risking more.'),
            url      : it.url_for('trading'),
        },
        {
            icon_list: ['images/pages/welcome/doptions.svg'],
            title    : it.L('Digital Options'),
            desc     : it.L('Earn <strong>fixed returns</strong> by risking only what you put in'),
            url      : it.url_for('user/metatrader'),
        },
        {
            icon_list: ['images/pages/welcome/notsure.svg'],
            title    : it.L('Not Sure?'),
            desc     : it.L('Let us introduce you to trading on Binary.'),
            url      : it.url_for('trading'),
        },
    ];

    return (
        <div id='welcome_container' className='center-text welcome-content'>
            <h1>{it.L('Where would you like to start?')}</h1>
            <SeparatorLine className='gr-padding-5' invisible />
            <div className='welcome-content-container'>
                {options.map(option => (<RenderOption
                    key={option.title}
                    option={option}
                    dropdown={dropdown}
                />))}
            </div>
            <SeparatorLine className='gr-padding-20' invisible />
        </div>
        
    );
};

const RenderOption = ({ option, dropdown }) => (
    <div className='gr-12 gr-12-p gr-12-m gr-parent'>
        <a className='box border-gray welcome-content-box' href={option.url}>
            <div className='welcome-content-box-icon-container'>
                {option.icon_list.map((icon) =>
                    <img key={icon} className='welcome-content-box-icon' src={it.url_for(icon)} />
                )}
            </div>
            <div className='welcome-content-box-desc'>
                <p id='upgrade_text' className='welcome-content-title'>{option.title}</p>
                <p >{option.desc}</p>
            </div>
            <div className='welcome-content-box-arrow'>
                <img  src={it.url_for(dropdown)} />
            </div>
        </a>
    </div>
);
  
export default WelcomePage;

