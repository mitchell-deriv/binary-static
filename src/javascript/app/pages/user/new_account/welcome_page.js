const BinarySocket     = require('../../../base/socket');
const BinaryPjax       = require('../../../base/binary_pjax');
const Client           = require('../../../base/client');
const getElementById   = require('../../../../_common/common_functions').getElementById;
const showLoadingImage = require('../../../../_common/utility').showLoadingImage;
const ClientBase       = require('../../../../_common/base/client_base');
const urlFor           = require('../../../../_common/url').urlFor;

const WelcomePage = (() => {

    let el_welcome_container,
        is_virtual,
        upgrade_info,
        is_uk,
        is_unwelcome_uk,
        cfd,
        d_options,
        not_sure;

    const init = () => {
        upgrade_info          = ClientBase.getBasicUpgradeInfo();
        is_virtual            = Client.get('is_virtual');
        el_welcome_container  = getElementById('welcome_container');
        is_uk                 = Client.get('residence') === 'gb';
        is_unwelcome_uk       = Client.isUnwelcomeUk();
        not_sure              = getElementById('default');
        cfd                   = getElementById('cfd');
        d_options             = getElementById('d_ptions');
    };
    
    const getCanUpgrade = (upgrade_type,  { can_upgrade_to } = upgrade_info) => can_upgrade_to.includes(upgrade_type);
  
    const onLoad = () => {
        BinarySocket.wait('authorize', 'landing_company', 'get_settings', 'get_account_status').then(() => {
            init();

            if (Client.hasAccountType('real')) {
                BinaryPjax.load(Client.defaultRedirectUrl());
                showLoadingImage(el_welcome_container, 'dark');
            }
            not_sure.addEventListener('click', onNotSure);

            cfd.addEventListener('click', onCFD);

            d_options.addEventListener('click', onDOptions);
        });
    };

    const onNotSure = () => {
        if (getCanUpgrade('iom') || (is_uk && is_unwelcome_uk)){
            BinaryPjax.load(urlFor('/new_account/realws'));
        } else { BinaryPjax.load(Client.defaultRedirectUrl()); }
    };

    const onCFD = () => {
        if (is_virtual && upgrade_info.can_upgrade_to.length) {
            if (getCanUpgrade('svg')) {
                BinaryPjax.load(urlFor('/user/metatrader'));
                return;
            }
            if (getCanUpgrade('maltainvest')){
                BinaryPjax.load(Client.defaultRedirectUrl());
                return;
            }
            if (getCanUpgrade('iom') && (is_uk && is_unwelcome_uk)) BinaryPjax.load(urlFor('/user/metatrader'));
        } else {
            BinaryPjax.load(Client.defaultRedirectUrl());
        }
    };

    const onDOptions = () => {
        if (is_virtual && upgrade_info.can_upgrade_to.length){
            if (getCanUpgrade('svg')) {
                BinaryPjax.load(`${urlFor('trading')}?market=forex&formname=risefall`);
                return;
            }
            if (getCanUpgrade('maltainvest')) {
                BinaryPjax.load(urlFor('new_account/digital_options'));
                return;
            }
            if (getCanUpgrade('iom') && (is_uk && is_unwelcome_uk)) BinaryPjax.load(urlFor('/new_account/realws'));
        } else {
            BinaryPjax.load(Client.defaultRedirectUrl());
        }
    };
    
    const onUnload = () => {
        cfd.removeEventListener('click', onCFD);
        d_options.removeEventListener('click', onDOptions);
        not_sure.removeEventListener('click', onNotSure);
    };

    return {
        onLoad,
        onUnload,
    };
})();

module.exports = WelcomePage;
