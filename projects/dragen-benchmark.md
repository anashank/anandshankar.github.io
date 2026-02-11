---
layout: default
title: DRAGEN vs Parabricks benchmarking
permalink: /projects/dragen-benchmark/
excerpt: Benchmarking and validation comparing Illumina DRAGEN and NVIDIA Parabricks to internal pipelines; demonstrated large runtime and accuracy improvements for high-throughput genomics.
---

## Problem

High-throughput genomics teams required faster, more accurate variant calling workflows that could scale to clinical volumes while maintaining reproducibility.

## Role

Lead benchmarking and pipeline developer — designed experiments, implemented pipelines, and validated results across sequencing platforms.

## Approach

- Designed and executed systematic benchmarks comparing Illumina DRAGEN and NVIDIA Parabricks against internal workflows using representative datasets.
- Built reproducible Nextflow/Snakemake drivers and containerized tasks to run comparisons across AWS and on-prem HPC.
- Measured runtime, variant calling error rates, and resource usage, and implemented changes to improve reproducibility.

## Outcome

- Demonstrated **8–10× runtime improvements** and **2–3× reduction** in variant calling error rates versus legacy workflows.
- Results enabled adoption of optimized pipelines for large-scale analyses and informed procurement and deployment decisions.

## Tech

Nextflow · Snakemake · Docker · AWS · Illumina DRAGEN · NVIDIA Parabricks
