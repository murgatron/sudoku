ThisBuild / scalaVersion     := "2.13.3"
ThisBuild / version          := "0.0.1"

lazy val sample = (project in file("."))
  .settings(
    name := "Sample Project",
    libraryDependencies += "org.scalatest" %% "scalatest" % "3.2.2" % Test,
  )