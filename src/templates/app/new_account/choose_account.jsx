import React from 'react';
import { SeparatorLine } from '../../_common/components/separator_line.jsx';


const ChooseAccount = () => {


    const init = () => {
        editable_fields   = {};
        get_settings_data = {};
        is_virtual        = Client.get('is_virtual');
        residence         = Client.get('residence');
        mt_acct_type      = getHashValue('mt5_redirect');
        validations       = [];
        // demo and synthetic mt accounts do not require tax info
        is_mt_tax_required = /real/.test(mt_acct_type) && mt_acct_type.split('_').length > 2 && +State.getResponse('landing_company.config.tax_details_required') === 1;
    };
    const options = [
        {
            icon_list    : ['images/pages/welcome/cfd.svg'],
            title        : it.L('CFD'),
            desc         : it.L('Trade with leverage and low spreads for better returns on successful trades.'),
            platform_list: [
                {
                    icon       : 'metatrader5',
                    title      : it.L('MetaTrader 5'),
                    description: it.L('Earn fixed payouts with options, or trade multipliers to amplify your gains with limited risk.'),
                },
            ],
            action_title: it.L('Trade on MetaTrader 5'),
            action_id   : 'mt5',
        },
        {
            icon_list    : ['images/pages/welcome/options.svg', 'images/pages/welcome/multipliers.svg'],
            title        : it.L('Options and multipliers'),
            desc         : it.L('Earn fixed payouts with options, or trade multipliers to amplify your gains with limited risk.'),
            platform_list: [
                {
                    icon       : 'metatrader5',
                    title      : it.L('SmartTrader'),
                    description: it.L('Trade options with Binary.com\'s legacy trading app.'),
                },
                {
                    icon       : 'binarybot',
                    title      : it.L('Binary Bot'),
                    description: it.L('Trade options with Binary.com\'s legacy trading app.'),
                },
            ],
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

            <SeparatorLine className='gr-padding-10' invisible />
        </div>
    );
};

const Platform = ({ title, description, icon }) => (
    <div className='choose-account-platform-list-container'>
        <img src={it.url_for(`images/pages/welcome/${icon}.svg`)} />
        <div className='choose-account-platform'>
            <p className='choose-account-platform-title'>{title}</p>
            <p className='choose-account-platform-description'>{description}</p>
        </div>
    </div>
);

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

            <SeparatorLine className='gr-padding-5' />

            <div className='choose-account-platform-container'>
                <p id='upgrade_text' className='choose-account-title'>{it.L('Platforms')}</p>
                {option.platform_list.map((platform) =>
                    <Platform key={platform.title} {...platform} />
                )}
                <div className='choose-account-action-container'>
                    <a id={option.action_id} className='button-secondary' href='javascript:;'>
                        <span className='choose-account-action'>{option.action_title}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

);

export default ChooseAccount;
