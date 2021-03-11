# sudoku-sbt

a sudoku solver written in scala. 

# setup

do the following on ubuntu:

```
# install openjdk 11
sudo apt install openjdk-11-jdk

# java_home in bash profile
echo "export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/" >>~/.profile

#  add ref to bintray to get debian/ubuntu distro
curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | sudo apt-key add

# install sbt
sudo apt update
sudo apt install sbt

# install scala
sudo apt install scala
```

# run 

```
sbt
run
```

# test 

```
sbt
test
```