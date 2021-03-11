import org.scalatest.wordspec._

class HelloWorldSpec extends AnyWordSpec {
  "This hello world" should {
    "say hello" in {
      assert(HelloWorld.greeting.startsWith("h"))
    }
  }
}