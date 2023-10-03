{
  description = "Pixelpact Project Flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = {nixpkgs, ...}: let
    forAllSystems = function:
      nixpkgs.lib.genAttrs ["x86_64-linux" "x86_64-darwin" "aarch64-darwin" "aarch64-linux"]
      (system:
        function (import nixpkgs {
          inherit system;
        }));
  in {
    devShells = forAllSystems (
      pkgs: {
        default = pkgs.mkShellNoCC {
          buildInputs = with pkgs; [nodejs];
          shellHook = ''
            export REPOSITORY_ROOT=$(pwd)
          '';
        };
      }
    );

    formatter = forAllSystems (pkgs: pkgs.alejandra);
  };
}
