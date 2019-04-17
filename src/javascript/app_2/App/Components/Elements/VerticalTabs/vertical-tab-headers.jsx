import classNames  from 'classnames';
import React       from 'react';
import { NavLink } from 'react-router-dom';
import { Icon }    from 'Assets/Common';

class VerticalTabHeaders extends React.PureComponent {
    render() {
        return (
            <div className='vertical-tab__tab'>
                {this.props.items.map(item => (
                    this.props.is_routed ?
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => this.props.onChange(item)}
                            className='vertical-tab__header'
                            activeClassName={
                                classNames({
                                    'vertical-tab__header--active': this.props.selected.label === item.label,
                                })
                            }
                        >
                            <Icon
                                icon={item.icon}
                                className={classNames('vertical-tab__header__icon', {
                                    'vertical-tab__header__icon--active': this.props.selected.label === item.label,
                                })}
                            />
                            <span className='vertical-tab__header__link'>{item.label}</span>
                        </NavLink>
                        :
                        <div
                            className={
                                classNames('vertical-tab__header', {
                                    'vertical-tab__header--active': this.props.selected.label === item.label,
                                })
                            }
                            key={item.label}
                            onClick={() => this.props.onChange(item)}
                        >
                            <Icon
                                icon={item.icon}
                                className={classNames('vertical-tab__header__icon', {
                                    'vertical-tab__header__icon--active': this.props.selected.label === item.label,
                                })}
                            />
                            <a
                                key={item.label}
                                className='vertical-tab__header__link'
                            >
                                {item.label}
                            </a>
                        </div>
                ))}
            </div>
        );
    }
}

export { VerticalTabHeaders };
