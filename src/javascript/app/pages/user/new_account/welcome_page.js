const BinarySocket     = require('../../../base/socket');
const Client           = require('../../../base/client');
const getElementById   = require('../../../../_common/common_functions').getElementById;
const Url              = require('../../../../_common/url');
const showLoadingImage = require('../../../../_common/utility').showLoadingImage;

const WelcomePage = (() => {

    let el_welcome_container,
        is_virtual,
        upgrade_info;

    const init = () => {
        upgrade_info      = Client.getUpgradeInfo();
        is_virtual        = Client.get('is_virtual');
        el_welcome_container  = getElementById('welcome_container');
    };

    const getCanUpgrade = (upgrade_type ,  { can_upgrade_to } = upgrade_info) => can_upgrade_to.includes(upgrade_type);

    const onLoad = () => {
        BinarySocket.wait('authorize', 'landing_company', 'get_settings').then(() => {
            init();
            if (Client.hasAccountType('real')) {
                window.location.href = Client.defaultRedirectUrl();
                showLoadingImage(el_welcome_container, 'dark');
            }

            getElementById('default').addEventListener('click', () => {
                (getCanUpgrade('iom'))
                    ? url = Url.urlFor('/new_account/realws')
                    : url = Client.defaultRedirectUrl();
            });

            getElementById('cfd').addEventListener('click', () => {
                if (is_virtual && upgrade_info.can_upgrade_to.length) {
                    if (getCanUpgrade('svg'))window.location.href = Url.urlFor('/user/metatrader');
                    if (getCanUpgrade('maltainvest'))window.location.href = Url.urlFor('new_account/choose_account');
                    if (getCanUpgrade('iom')) window.location.href = Url.urlFor('/user/metatrader');
                }
            });

            getElementById('d_ptions').addEventListener('click', () => {
                if (is_virtual && upgrade_info.can_upgrade_to.length){
                    if (getCanUpgrade('svg'))window.location.href = Url.urlFor('/user/metatrader');
                    if (getCanUpgrade('maltainvest'))window.location.href = Url.urlFor('new_account/choose_account');
                    if (getCanUpgrade('iom'))window.location.href = Url.urlFor('/new_account/realws');
                }
            });
        });
    };

    return {
        onLoad,
    };
})();

module.exports = WelcomePage;
