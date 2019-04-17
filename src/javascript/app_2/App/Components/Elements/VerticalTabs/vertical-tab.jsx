import PropTypes                       from 'prop-types';
import React                           from 'react';
import { VerticalTabContentContainer } from './vertical-tab-content-container.jsx';
import { VerticalTabHeaders }          from './vertical-tab-headers.jsx';

class VerticalTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.list[0],
        };
    }

    changeSelected = (e) => {
        this.setState({
            selected: e,
        });
    };

    render() {
        return (
            <div className='vertical-tab'>
                <VerticalTabHeaders
                    items={this.props.list}
                    onChange={this.changeSelected}
                    selected={this.state.selected}
                    is_routed={this.props.is_routed}
                />
                <VerticalTabContentContainer
                    items={this.props.list}
                    selected={this.state.selected}
                    is_routed={this.props.is_routed}
                />
            </div>
        );
    }
}

VerticalTab.propTypes = {
    is_routed: PropTypes.bool,
    list     : PropTypes.arrayOf(
        PropTypes.shape({
            icon : PropTypes.func,
            label: PropTypes.string,
            path : PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        })
    ).isRequired,
};

export default VerticalTab;
