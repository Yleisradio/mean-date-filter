# Date Filter

Date Filter is a mean.io package that allows user to specify starting and ending date with datepickers and quick select buttons.

## Features
- Filter with start and end dates
- Datepickers
- Quick select buttons
- Customizable texts
- Customizable date display format
- Save and load filter settings for each user 

## Dependencies
- Requires MEAN 0.4.0 http://mean.io
- Other dependencies are installed automatically by npm.

## Installation 
npm install mean-date-filter --save

## Basic Usage
`<div mode="week" start-date="startDate" end-date="endDate" mean-date-filter></div>`

## Localized Usage
`<div start-date-text="Aloituspäivä" end-date-text="Lopetuspäivä" year-text="Vuosi" month-text="Kuukausi" week-text="Viikko" format="dd.MM.yyyy" clear-text="Tyhjennä" current-text="Tänään" close-text="Sulje" mode="week" start-date="startDate" end-date="endDate" mean-date-filter></div>`