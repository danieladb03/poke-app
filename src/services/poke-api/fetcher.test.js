import fetcher, {baseUrl} from "./fetcher";

describe("fetcher", () => {
  const expectedResponse = {
    results: {
      name: "pikachu",
    },
  };
  let mockFetch;

  beforeEach(() => {
    // basado en
    // beforeEach(() => {
    //   jest.spyOn(global, 'fetch').mockResolvedValue({
    //     json: jest.fn().mockResolvedValue(mockResponse)
    //   })
    // });

    // afterEach(() => {
    //   jest.restoreAllMocks();
    // });

    // emular y mockear promesa resp de fetch
    const resp = {json: jest.fn()};
    resp.json.mockResolvedValue(expectedResponse);
    // emular fetch convirtiendolo en un mock con jest
    mockFetch = jest.spyOn(global, "fetch");
    mockFetch.mockResolvedValue(resp);
  });

  // cada vez que usemos spyOn() se deben resetear los mocks
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns valid data", async () => {
    const expectedUrl = "pokemon";
    const result = await fetcher(expectedUrl);

    expect(result).toEqual(expectedResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}${expectedUrl}`);
  });
});
