const BinarySocket     = require('../../../base/socket');
const Client           = require('../../../base/client');
const getElementById   = require('../../../../_common/common_functions').getElementById;
const localize         = require('../../../../_common/localize').localize;
const Url              = require('../../../../_common/url');
const createElement    = require('../../../../_common/utility').createElement;
const showLoadingImage = require('../../../../_common/utility').showLoadingImage;

const WelcomePage = (() => {

    let is_virtual,
        residence,
        mt_acct_type,
        is_mt_tax_required,
        validations,
        $tax_residence,
        CFD_button,
        D_Options_button,
        el_welcome_container,
        upgrade_info;

    const init = () => {
        is_virtual        = Client.get('is_virtual');
        residence         = Client.get('residence');
        upgrade_info      = Client.getUpgradeInfo();
        CFD_button        = getElementById('cfd');
        D_Options_button  =  getElementById('d_ptions');
        el_welcome_container  = getElementById('welcome_container');
    };

    const onLoad = () => {
        BinarySocket.wait('authorize', 'landing_company', 'get_settings').then(() => {
            init();
            if (Client.hasAccountType('real')) {
                window.location.href = Client.defaultRedirectUrl();
                showLoadingImage(el_welcome_container, 'dark');
            }
            const { can_upgrade_to , can_open_multi , type , can_upgrade } = upgrade_info;

            const is_CR = can_upgrade_to.includes('svg');
            const is_MF = can_upgrade_to.includes('maltainvest');
            // CR account
            if (is_CR && can_upgrade_to.length){
                CFD_button.setAttribute('href', Url.urlFor('user/metatrader'));
                D_Options_button.setAttribute('href', Url.urlFor('trading'));
            }

            if (is_MF && can_upgrade_to.length){
                CFD_button.setAttribute('href', Url.urlFor('new_account/chooseaccount'));
                D_Options_button.setAttribute('href', Url.urlFor('trading'));
            }
            // const el_upgrade_title = getElementById('upgrade_title');
            // let upgrade_btn_txt = '';

            // if (upgrade_info.can_upgrade_to.length > 1) {
            //     upgrade_btn_txt = localize('Real Account');
            // } else if (upgrade_info.can_upgrade_to.length === 1) {
            //     upgrade_btn_txt = upgrade_info.type[0] === 'financial'
            //         ? localize('Financial Account')
            //         : localize('Real Account');
            // }
            // el_upgrade_title.html(upgrade_btn_txt);
            // el_welcome_container.setVisibility(1);

            // const upgrade_url = upgrade_info.can_upgrade_to.length > 1
            //     ? 'user/accounts'
            //     : Object.values(upgrade_info.upgrade_links)[0];

            // if (upgrade_info.can_upgrade) {
            //     const upgrade_btn = getElementById('upgrade_btn');
            //     if (upgrade_btn) {
            //         upgrade_btn.html(createElement('span', { text: localize('Upgrade now') })).setAttribute('href', Url.urlFor(upgrade_url));
            //         upgrade_btn.classList.remove('button-disabled');
            //     }
            // }
        });
    };

    return {
        onLoad,
    };
})();

module.exports = WelcomePage;
