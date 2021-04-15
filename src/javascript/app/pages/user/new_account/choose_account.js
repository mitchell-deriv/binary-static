const BinarySocket     = require('../../../base/socket');
const Client           = require('../../../base/client');
const getElementById   = require('../../../../_common/common_functions').getElementById;
const localize         = require('../../../../_common/localize').localize;
const Url              = require('../../../../_common/url');
const createElement    = require('../../../../_common/utility').createElement;
const showLoadingImage = require('../../../../_common/utility').showLoadingImage;

const ChooseAccount = (() => {

    let is_virtual,
        residence,
        mt_acct_type,
        is_mt_tax_required,
        validations,
        $tax_residence,
        upgrade_info;

    // put on init functions here
    const init = () => {
        is_virtual        = Client.get('is_virtual');
        residence         = Client.get('residence');
        upgrade_info      = Client.getUpgradeInfo();
        // demo and synthetic mt accounts do not require tax info
        // is_mt_tax_required = /real/.test(mt_acct_type) && mt_acct_type.split('_').length > 2 && +State.getResponse('landing_company.config.tax_details_required') === 1;
    };
    const onLoad = () => {
        BinarySocket.wait('authorize', 'landing_company', 'get_settings').then(() => {
            init();
        });
    };

    return {
        onLoad,
    };
})();

module.exports = ChooseAccount;
