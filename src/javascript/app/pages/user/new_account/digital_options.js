const BinarySocket     = require('../../../base/socket');
const BinaryPjax       = require('../../../base/binary_pjax');
const Client           = require('../../../base/client');
const getElementById   = require('../../../../_common/common_functions').getElementById;
const ClientBase       = require('../../../../_common/base/client_base');
const urlFor           = require('../../../../_common/url').urlFor;
const showLoadingImage = require('../../../../_common/utility').showLoadingImage;

const DigitalOptions = (() => {

    let is_virtual,
        el_welcome_container,
        upgrade_info,
        is_uk,
        is_unwelcome_uk,
        synthetics,
        financial;

    const init = () => {
        is_virtual            = Client.get('is_virtual');
        upgrade_info          = ClientBase.getBasicUpgradeInfo();
        el_welcome_container  = getElementById('welcome_container');
        is_uk                 = Client.get('residence') === 'gb';
        is_unwelcome_uk       = Client.isUnwelcomeUk();
        synthetics            = getElementById('default');
        financial             = getElementById('financial');
    };

    const getCanUpgrade = (upgrade_type,  { can_upgrade_to } = upgrade_info) => can_upgrade_to.includes(upgrade_type);

    const onLoad = () => {
        BinarySocket.wait('authorize', 'landing_company', 'get_settings', 'get_account_status').then((resp) => {
            init();
            
            if (Client.hasAccountType('real')) {
                BinaryPjax.load(Client.defaultRedirectUrl());
                showLoadingImage(el_welcome_container, 'dark');
            }
 
            synthetics.addEventListener('click', onSynthethics);
            
            financial.addEventListener('click', onFinancials);
        });
    };
    
    const onSynthethics = () => {
        BinaryPjax.load(`${urlFor('trading')}?market=synthetic-indices&formname=risefall&underlying=1HZ10V`);
    };

    const onFinancials = () => {
        if (is_virtual && upgrade_info.can_upgrade_to.length){
            if (getCanUpgrade('svg')){
                BinaryPjax.load(urlFor('/user/metatrader'));
                return;
            }
            if (getCanUpgrade('maltainvest')){
                BinaryPjax.load(`${urlFor('trading')}?market=forex&formname=risefall`);
                return;
            }
            if (getCanUpgrade('iom') && (is_uk && is_unwelcome_uk)) BinaryPjax.load(urlFor('/user/metatrader'));
        } else {
            BinaryPjax.load(Client.defaultRedirectUrl());
        }
    };

    const onUnload = () => {
        synthetics.removeEventListener('click', onSynthethics);
        financial.removeEventListener('click', onFinancials);
    };

    return {
        onLoad,
        onUnload,
    };
})();

module.exports = DigitalOptions;
