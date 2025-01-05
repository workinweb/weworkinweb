export const prerender = false;

export const GET = async () => {
  return new Response(JSON.stringify({ status: "alive" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
