import Link from "next/link";
import { useRouter } from "next/router";
import { Message, Divider, Icon } from "semantic-ui-react";

export const HeaderMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";
  return (
    <Message
      attached
      header={signupRoute ? "Get started" : "Welcome Back"}
      icon={signupRoute ? "settings" : "privacy"}
      content={
        signupRoute ? "Create new account" : "Login with Email and password"
      }
    />
  );
};
export const FooterMessage = () => {
  const router = useRouter();

  const signupRoute = router.pathname === "/signup";
  return (
    <>
      {signupRoute ? (
        <>
          <Message color="teal" attached="bottom" warning>
            <Icon name="help" />
            Existing user ? <Link href="/login"> Login in here instead</Link>
          </Message>
          <Divider hidden />
        </>
      ) : (
        <>
          <Message attached="bottom" info>
            <Icon name="lock" />
            <Link href="/reset"> Forgot password ?</Link>
          </Message>
          <Divider hidden />

          <Message attached="bottom" warning>
            {/* <Icon name="help" /> */}
            New User ? <Link href="/signup"> Signup here </Link> Instead
          </Message>
          <Divider hidden />
        </>
      )}
    </>
  );
  //   return <>
  //   {signupRoute ? <> `<Message  attached="bottom" warning/>

  //   <Icon />
  //   `}
  //   </>
};
