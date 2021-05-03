import React from 'react';
import { SeparatorLine } from '../../_common/components/separator_line.jsx';

const WelcomePage = () => {

    const dropdown = 'images/pages/welcome/ddown.svg';
    const options = [
        {
            icon_list: ['images/pages/welcome/cfd.svg'],
            title    : it.L('[_1]CFD[_2]','<strong>', '</strong>'),
            desc     : it.L('[_1]Maximise returns[_2] by [_3]risking more[_4] than you put in.', '<strong>', '</strong>','<strong>', '</strong>'),
            url      : it.url_for('user/metatrader'),
            action_id: 'cfd',
        },
        {
            icon_list: ['images/pages/welcome/doptions.svg'],
            title    : it.L('[_1]Digital Options[_1]','<strong>', '</strong>'),
            desc     : it.L('Earn [_1]fixed returns[_2] by [_3]risking only[_4] what you put in', '<strong>', '</strong>', '<strong>', '</strong>'),
            url      : it.url_for('trading'),
            action_id: 'd_ptions',
        },
        {
            icon_list: ['images/pages/welcome/notsure.svg'],
            title    : it.L('[_1]Not Sure?[_1]' ,'<strong>', '</strong>'),
            desc     : it.L('Let us introduce you to trading on Binary.'),
            url      : it.url_for('trading'),
            action_id: 'default',
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
            <SeparatorLine className='gr-padding-30' invisible />
        </div>
        
    );
};

const RenderOption = ({ option, dropdown }) => (
    <div className='gr-12 gr-12-p gr-12-m gr-parent'>
        <a
            className='box border-gray welcome-content-box'
            id={option.action_id}
            href='javascript:;'
        >
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

