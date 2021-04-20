const BinarySocket     = require('../../../base/socket');
const Client           = require('../../../base/client');
const getElementById   = require('../../../../_common/common_functions').getElementById;
const Url              = require('../../../../_common/url');
const showLoadingImage = require('../../../../_common/utility').showLoadingImage;
const ClientBase       = require('../../../../_common/base/client_base');
const State            = require('../../../../_common/storage').State;

const WelcomePage = (() => {

    let el_welcome_container,
        is_virtual,
        upgrade_info,
        is_uk,
        is_unwelcome_uk;

    const init = () => {
        upgrade_info          = ClientBase.getBasicUpgradeInfo();
        is_virtual            = Client.get('is_virtual');
        el_welcome_container  = getElementById('welcome_container');
        is_uk                 = Boolean(Client.get('residence') === 'gb');
        is_unwelcome_uk       = State.getResponse('get_account_status.status').some(status => status === 'unwelcome') && (/gb/.test(Client.get('residence')));
    };
    
    const getCanUpgrade = (upgrade_type ,  { can_upgrade_to } = upgrade_info) => can_upgrade_to.includes(upgrade_type);
  
    const onLoad = () => {
        BinarySocket.wait('authorize', 'landing_company', 'get_settings', 'get_account_status').then(() => {
            init();
            if (Client.hasAccountType('real')) {
                window.location.href = Client.defaultRedirectUrl();
                showLoadingImage(el_welcome_container, 'dark');
            }

            getElementById('default').addEventListener('click', () => {
                /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
                (getCanUpgrade('iom') || (is_uk && is_unwelcome_uk))
                    ? window.location.href = Url.urlFor('/new_account/realws')
                    : window.location.href = Client.defaultRedirectUrl();
            });

            getElementById('cfd').addEventListener('click', () => {
                if (is_virtual && upgrade_info.can_upgrade_to.length) {
                    if (getCanUpgrade('svg')){window.location.href = Url.urlFor('/user/metatrader'); return;}
                    if (getCanUpgrade('maltainvest')){window.location.href = Client.defaultRedirectUrl(); return;}
                    if (getCanUpgrade('iom') && (is_uk && is_unwelcome_uk))window.location.href = Url.urlFor('/user/metatrader');
                }
            });

            getElementById('d_ptions').addEventListener('click', () => {
                if (is_virtual && upgrade_info.can_upgrade_to.length){
                    if (getCanUpgrade('svg'))window.location.href = Client.defaultRedirectUrl();
                    if (getCanUpgrade('maltainvest'))window.location.href = Url.urlFor('new_account/digital_options');
                    if (getCanUpgrade('iom') && (is_uk && is_unwelcome_uk))window.location.href = Url.urlFor('/new_account/realws');
                }
            });
        });
    };

    return {
        onLoad,
    };
})();

module.exports = WelcomePage;
