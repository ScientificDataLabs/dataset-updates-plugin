# dataset-updates-plugin

[![Join the chat at https://gitter.im/ScientificDataLabs/dataset-updates-plugin](https://badges.gitter.im/ScientificDataLabs/dataset-updates-plugin.svg)](https://gitter.im/ScientificDataLabs/dataset-updates-plugin?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
A tool to identify updates in datasets associated with a specific publication

General Hack Day chat on Gitter here: https://gitter.im/Springer-Nature-Hack-Day/

And specific Gitter room for this project: https://gitter.im/ScientificDataLabs/dataset-updates-plugin

## Plugin Use
To run the plugin temporarily in Firefox, clone the plugin folder locally, enter "about:debugging" in the Firefox search bar, click "Load Temporary Add-on", then select the "manifest.json" file. At this time the plugin only runs on Firefox. 

## Case Use Description
As a researcher reading a peer-reviewed article, I want to know if any associated datasets have been updated since the article was published. 

## Definitions

Article: A peer-reviewed publication with an assigned CrossRef DOI, and associated bibliographic metadata. 

Dataset: For the purpose of this demo, we are focusing on formally archived datasets with an assigned DataCite DOI. 

Dataset update: A new version of the dataset that has been formally associated with the original version via an API that can be queried using the dataset DOI. 

## Examples
Scientific Data articles with associated figshare datasets that were updated post-publication
### Example 1
Article: https://www.nature.com/articles/sdata201641

Associated dataset: https://doi.org/10.6084/m9.figshare.c.2185342

Has updated version: https://doi.org/10.6084/m9.figshare.c.2185342.v2

And original version: https://doi.org/10.6084/m9.figshare.c.2185342.v1

### Example 2
Article: https://www.nature.com/articles/sdata201426

Associated dataset: https://doi.org/10.6084/m9.figshare.1054736

Has 5 versions, the latest of which being: https://doi.org/10.6084/m9.figshare.1054736.v5
