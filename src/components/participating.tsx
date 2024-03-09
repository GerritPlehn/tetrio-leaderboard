export default function Participating() {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        How to participate
      </h2>
      <ul className="my-6 ml-6 list-none [&>li]:mt-2">
        <li>
          Go to{" "}
          <a
            href="https://tetr.io"
            target={"_blank"}
            rel="noreferrer"
            className="font-medium text-primary underline underline-offset-4"
          >
            TETR.IO
          </a>
        </li>
        <li>
          Click &quot;JOIN&quot;. You don&apos;t need to register, but can if
          you want.
        </li>
        <li>
          Select &quot;SOLO&quot;, followed by &quot;BLITZ&quot; and
          &quot;START&quot;
        </li>
        <li>
          You can move the piece with the arrow keys and spin them with Z and X
        </li>
        <li>
          After you finish a game you&apos;re happy with, click the download
          button and upload the replay file in the provided form.
        </li>
        <li>Have fun, good luck!</li>
      </ul>
    </div>
  );
}
