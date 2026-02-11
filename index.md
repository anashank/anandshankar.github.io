---
layout: default
title: Home
---

# Anand Shankar

Senior Bioinformatics Scientist — NGS pipeline engineering, workflow orchestration, and cloud deployments.

I build scalable, production-grade genomics analysis pipelines and developer tools used in clinical and research environments. I focus on performance, reproducibility, and resolving high-priority customer issues.

- 5+ years building and deploying NGS secondary & tertiary analysis workflows
- Deep experience with Illumina DRAGEN, NVIDIA Parabricks, Nextflow, Snakemake, and cloud platforms (AWS, Azure)

[View Projects](/projects/) • [Resume](/resume/) • [Contact](/contact/)

## Selected projects

{% assign recent = site.pages | where_exp: "p", "p.path contains 'projects/'" | sort: 'path' %}
{% for p in recent limit:3 %}
- [{{ p.title }}]({{ p.url }}) — {{ p.excerpt | strip_html | truncate: 140 }}
{% endfor %}

