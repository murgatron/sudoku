ThisBuild / scalaVersion     := "2.13.3"
ThisBuild / version          := "0.0.1"

lazy val sample = (project in file("."))
  .settings(
    name := "sudoku-sbt",
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.2" % Test, 
      "com.lihaoyi" %% "os-lib" % "0.7.3"
    )
  )