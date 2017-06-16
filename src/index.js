import 'material-design-lite/dist/material.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'styles/common.css';

import React from 'react';
import ReactDOM from 'react-dom';

import data from './data/projects.json';
import ProjectsTableComponent from './components/ProjectsTableComponent';

class Application {
    constructor() {
        if (document.readyState === 'complete' || document.readyState !== 'loading') {
            this.init();
        } else {
            document.addEventListener('DOMContentLoaded', () => this.init());
        }
    }

    init() {
        this.initLinkHelper();

        ReactDOM.render(
            <ProjectsTableComponent projects={data.projects} />,
            document.getElementById('application')
        );
    }

    initLinkHelper() {
        var locationUrl = document.location.host;
        var locationHeader = document.getElementById('location');

        locationHeader.innerHTML = 'Page ' + locationUrl + ' not found.';
    }
}

const app = new Application();
