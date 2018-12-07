container : 
	cp ../deserializeArgs.js .
	cp ../serializeArgs.js .
	cp ../package.json .
	cp ../package-lock.json .
	docker build -t mesh-shared .
	docker images | grep mesh-shared

clean :
	rm -f *~
	rm -f *.json

.PHONY : container clean