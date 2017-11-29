# dataset-updates-plugin
A tool to identify updates in datasets associated with a specific publication

Use case description: As a researcher reading a peer-reviewed article, I want to know if any associated datasets have been updated since the article was published. 

General Hack Day chat on Gitter here: https://gitter.im/Springer-Nature-Hack-Day/

And specific Gitter room for this project: https://gitter.im/ScientificDataLabs/dataset-updates-plugin

# Definitions

Article: A peer-reviewed publication with an assigned CrossRef DOI, and associated bibliographic metadata. 

Dataset: For the purpose of this demo, we are focusing on formally archived datasets with an assigned DataCite DOI. 

Dataset update: A new version of the dataset that has been formally associated with the original version via an API that can be queried using the dataset DOI. 

# Example 1
Article: https://www.nature.com/articles/sdata201641

Associated dataset: https://doi.org/10.6084/m9.figshare.c.2185342

Has updated version: https://doi.org/10.6084/m9.figshare.c.2185342.v2

And original version: https://doi.org/10.6084/m9.figshare.c.2185342.v1

Article: https://www.nature.com/articles/sdata201641

# Example 2
Article: https://www.nature.com/articles/sdata201426

Associated dataset: https://doi.org/10.6084/m9.figshare.1054736

Has 5 versions, the latest of which being: https://doi.org/10.6084/m9.figshare.1054736.v5
