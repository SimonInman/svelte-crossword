{
  description = "csolve svelte frontend";
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-23.05";
    flake-utils.url = github:numtide/flake-utils;
  };
  outputs = { self, nixpkgs, flake-utils }:
    with flake-utils.lib; eachSystem allSystems (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        # defaultPackage = packages.document;
        devShell = pkgs.mkShell {
          # development environment
          buildInputs = [
            pkgs.nodejs_20
          ];
          shellHook = ''
            root=$(git rev-parse --show-toplevel)
            export PATH="$PATH:$root/node_modules/.bin"
          '';
        };
      });
}
