dev:
	npx serve web

resume:
	pdflatex resume.tex && mv resume.pdf web/public/resume.pdf && rm -f resume.aux resume.log resume.out
