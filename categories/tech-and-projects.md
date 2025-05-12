---
layout: archive
title: "Category: Tech & Projects"
category: Tech & Projects
permalink: /categories/tech-and-projects/
---

<ul>
  {% for post in site.categories["Tech & Projects"] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span style="color:#888; font-size:0.9em;">({{ post.date | date: "%B %d, %Y" }})</span>
    </li>
  {% endfor %}
</ul>
