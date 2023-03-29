<script>
export default {
    name: 'AppFooter'
}
</script>
<template lang="">
<footer class="bg-white">
	<div class="container">
		<div class="row justify-content-between py-4">
			
			<div id="info-links" class="col-6">
				<ul class="d-flex gap-3 list-unstyled mb-0">
					<li>
						<a href="#">&#169; 2023 BoolBNB, Inc.</a>
					</li>
					<li>
						<a href="#">Privacy</a>
					</li>
					<li>
						<a href="#">Termini</a>
					</li>
					<li>
						<a href="#">FAQ</a>
					</li>
				</ul>
			</div>
			
			<div id="socials-icons" class="col-6">
				<ul class="d-flex gap-3 list-unstyled mb-0 justify-content-end">
					<li>
						<a href="#"><i class="fa-brands fa-square-facebook"></i></a>
					</li>
					<li>
						<a href="#"><i class="fa-brands fa-square-twitter"></i></a>
					</li>
					<li>
						<a href="#"><i class="fa-brands fa-square-instagram"></i></a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
</template>
<style lang="scss" scoped>
footer {
    width: 100%;
    border-top: 1px solid rgb(219, 219, 219);

    .container {

        #info-links {
            a {
                color: grey;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        #socials-icons {
            a {
                color: grey;


                i {
                    font-size: 1.25rem;
                }

            }
        }

        .fa-square-facebook:hover {
            color: #3b5998;
        }

        .fa-square-twitter:hover {
            color: #00acee;
        }

        .fa-square-instagram:hover {
            color: #dd2a7b;
        }
    }
}
</style>