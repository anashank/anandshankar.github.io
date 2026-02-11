---
layout: home
title: Home
---


Welcome — I'm Anand. I build products and developer-facing tools.

<!-- The Minimal Mistakes `home` layout will render configured front matter and collections. -->

## Recent projects

{% for project in site.projects limit:3 %}
- [{{ project.title }}]({{ project.url }}) — {{ project.excerpt }}
{% endfor %}

