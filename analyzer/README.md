# Data Analysis

The chuzr analyzer reads from the chuzr store and produces a number of reports.

## Running Analyzer

In order to run the app, in the analyzer directory:

`````bash
bash run_analyzer.sh [port number]
`````

`port number` is an optional parameter that defaults at 8000.

As of 11/24/13, all reports can be seen on the page `index.html`.

All resources for this page are in the `js`, `css`, and `lib` directories. The remaining test pages are found in the experimental `directory`.

_In order for the analyzer to work. The API url should be up and running on port 3000. Information for this should be on the wiki_

## Running Analyzer As iPhone Application

In order to run the mobile iOS application, in the analyzer directory:

Make sure to `npm install` in server directory.

Then, run the `phonegap run ios` in analyzer-mobile directory. 

After simulator comes up, for better views `cmd + ←, ↑ ,→ , ↓  ` .
