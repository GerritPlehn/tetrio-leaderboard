export default function Rules() {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Rules
      </h2>
      <ul className="my-6 ml-6 list-none [&>li]:mt-2">
        <li>
          There is no limit on how many games you can play or scores you can
          submit!
        </li>
        <li>The score has to be set in the specified time range.</li>
        <li>
          You have 8 hours after the competition time window to submit scores.
        </li>
        <li>Only the best score of every person counts.</li>
      </ul>
    </div>
  );
}
