object Main {

  val DataFilesPath = os.RelPath("../../../../../data")
  val FourPath = DataFilesPath / four.json
  val NinePath = DataFilesPath / nine.json
  val TwelvePath = DataFilesPath / twelve.json
  val SixteenPath = DataFilesPath / sixteen.json

  def main(args: Array[String]) = {
    
    val filePath = parseArgs(args)

    val fileContents = os.Read(filePath);

    println(fileContents)
  }

  // returns 
  def parseArgs(args: Array[String]): String = {
    val arg0 = args(0)
    arg0 match {
      case "--four" | "-f" => FourPath
      case "--nine" | "-n" => NinePath
      case "--twelve" | "-t" => TwelvePath
      case "--sixteen" | "-s" => SixteenPath
      case "--puzzle" | "-p"  => throw new Error("not implemented")
      case "--random" | "-r" => throw new Error("not implemented")
      case _ => "Invalid Argument"
    }
  }

}