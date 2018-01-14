push:
	git add --all && \
	git commit -m "update" --allow-empty && \
	git push origin master

deploy:
	git add --all && \
	git commit -m "update" --allow-empty && \
	git push origin master && \
	git checkout gh-pages && \
	git merge master && \
	git add --all && \
	git commit -m "deploy" --allow-empty && \
	git push origin gh-pages -f && \
	git checkout master
