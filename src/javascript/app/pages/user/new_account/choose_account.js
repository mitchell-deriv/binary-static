const BinarySocket     = require('../../../base/socket');
const Client           = require('../../../base/client');
const getElementById   = require('../../../../_common/common_functions').getElementById;
const Url              = require('../../../../_common/url');

const ChooseAccount = (() => {

    let is_virtual,
        upgrade_info;

    const init = () => {
        is_virtual        = Client.get('is_virtual');
        upgrade_info      = Client.getUpgradeInfo();
    };

    const getCanUpgrade = (upgrade_type ,  { can_upgrade_to } = upgrade_info) => can_upgrade_to.includes(upgrade_type);

    const onLoad = () => {
        BinarySocket.wait('authorize', 'landing_company', 'get_settings').then(() => {
            init();
            if (Client.hasAccountType('real')) {
                window.location.href = Client.defaultRedirectUrl();
            }
 
            getElementById('default').addEventListener('click', () => {
                window.location.href = Client.defaultRedirectUrl();
            });
            
            getElementById('financial').addEventListener('click', () => {
                if (is_virtual && upgrade_info.can_upgrade_to.length){
                    if (getCanUpgrade('svg'))window.location.href = Url.urlFor('/user/metatrader');
                    if (getCanUpgrade('maltainvest'))window.location.href = Url.urlFor('new_account/maltainvestws');
                    if (getCanUpgrade('iom'))window.location.href = Url.urlFor('/user/metatrader');
                }
            });
        });
    };

    return {
        onLoad,
    };
})();
module.exports = ChooseAccount;
