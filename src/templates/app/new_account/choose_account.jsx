import React from 'react';
import { SeparatorLine } from '../../_common/components/separator_line.jsx';

const ChooseAccount = () => {

    const options = [
        {
            icon_list   : ['images/pages/welcome/synthetics.svg'],
            title       : it.L('Synthetics'),
            desc        : it.L('Get Trading with Synthetics - the simulated market that\'s always open.'),
            action_title: it.L('Get started'),
            action_id   : 'default',
        },
        {
            icon_list   : ['images/pages/welcome/financial.svg'],
            title       : it.L('Financial'),
            desc        : it.L('Get trading forex, commodities, and cryptocurrencies'),
            action_title: it.L('Get started'),
            action_id   : 'default',
        },
    ];

    return (
        <div id='welcome_container' className='center-text choose-account'>
            
            <h1>{it.L('Please choose your account')}</h1>

            <SeparatorLine className='gr-padding-5' invisible />
            <div className='choose-account-container'>
                {options.map(option => (<RenderOption key={option.title} option={option} />))}
            </div>

            <SeparatorLine className='gr-padding-5' invisible />

            <div className='choose-account-footer'>
                <span>{it.L('You can switch between synthetics and financial at any time.')}</span>
            </div>

            <SeparatorLine className='gr-padding-10' invisible />

        </div>
    );
};

const RenderOption = ({ option }) => (
    <div className='gr-6 gr-12-p gr-12-m gr-parent'>
        <div className='box border-gray choose-account-box'>
            <div className='choose-account-box-icon-container'>
                {option.icon_list.map((icon) =>
                    <img key={icon} className='choose-account-box-icon' src={it.url_for(icon)} />
                )}
            </div>
            <p id='upgrade_text' className='choose-account-title'>{option.title}</p>
            <p >{option.desc}</p>

            <SeparatorLine className='gr-padding-15' invisible />
            
            <a id={option.action_id} className='button-secondary' href='javascript:;'>
                <span className='choose-account-action'>{option.action_title}</span>
            </a>
        </div>
    </div>

);

export default ChooseAccount;
