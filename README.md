# dataset-updates-plugin
A tool to identify updates in datasets associated with a specific publication

Use case description: As a researcher reading a peer-reviewed article, I want to know if any datasets associated with the publication have been updated since the article was published. 

# Definitions

Article: A peer-reviewed publication with an assigned CrossRef DOI, and associated metadata. 
Dataset: For the purpose of this demo, we are focusing on formally archived datasets with an assigned DataCite DOI. 
Dataset update: A new version of the dataset which has been formally associated with the original version via an API that can be queried using the dataset DOI. 

# Examples
Article: https://www.nature.com/articles/sdata201641
Associated dataset: https://doi.org/10.6084/m9.figshare.c.2185342
Has updated version: https://doi.org/10.6084/m9.figshare.c.2185342.v2
And original version: https://doi.org/10.6084/m9.figshare.c.2185342.v1
