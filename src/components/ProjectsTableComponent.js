import React, { Component } from 'react';

export default class ProjectsTableComponent extends Component {
    renderProjects(projects) {
        return projects.map((project, index) => (
            <tr key={index}>
                <td width="30%" className="mdl-data-table__cell--non-numeric">
                    <h4>{project.name}</h4>
                    <div>{project.description}</div>
                </td>
                <td width="40%" className="mdl-data-table__cell--non-numeric">
                    <ul className="links-list mdl-list">
                        {
                            project.links.map((link, index) => (
                                <li key={index} className="mdl-list__item">
                                    <a href={link.href} className="mdl-list__item-primary-content">
                                        {link.name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </td>
                <td width="30%">
                    <div>
                        { project.github &&
                            <a href={project.github} className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                                <i className="material-icons fa fa-github" aria-hidden="true"></i>
                            </a>
                        }
                        { project.redmine &&
                            <a  href={project.redmine} className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                                <i className="material-icons fa fa-bug" aria-hidden="true"></i>
                            </a>
                        }
                        { project.ess &&
                            <a  href={project.ess} className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                                <i className="material-icons fa fa-random" aria-hidden="true"></i>
                            </a>
                        }
                    </div>
                </td>
            </tr>
        ));
    }

    render() {
        const { projects } = this.props;

        return (
            <table className="table mdl-data-table mdl-js-data-table">
                <tbody>
                    {this.renderProjects(projects)}
                </tbody>
            </table>
        );
    }
}
