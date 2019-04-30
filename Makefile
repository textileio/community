setup:
	pip install mkdocs
	pip install mkdocs-material
	pip install mkdocs-codeyaml-plugin
	pip install markdown-captions

serve:
	mkdocs serve

build:
	mkdocs build

deploy:
	mkdocs gh-deploy

.PHONY: setup sync serve build deploy
