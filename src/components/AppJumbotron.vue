<script>
	import Searchbar from './Searchbar.vue';
	export default {
		name: 'AppJumbotron',
		components: {
			Searchbar
		}
	}
</script>
<template>
	<div id="jumbotron">
		<div class="container h-100">

			<div class="row h-100">
				<div class="col-12 col-md-7 px-0" id="search-jumbo">
					<div class="content">
						<h1 class="text-center mb-4 d-none d-sm-block">Scegli la tua prossima destinazione</h1>
						<Searchbar> </Searchbar>
					</div>
				</div>
				<div class="col-5 d-none d-md-block" id="img-jumbo">
					<img src="../assets/images/bnb.png" alt="">		
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
@use '../styles/partials/variables' as *;
	#jumbotron{
		// position: relative;
		height: 65vh;
		background-color: rgba($brand-blue, 0.4);
		// background-color: rgb(232, 232, 232);
		.row{
			#search-jumbo{
				position: relative;
				.content{
					position: absolute;
					bottom: 50%;
					left: 50%;
					transform: translateX( -50%);
					h1{
						font-size: 2.75rem;
					}
				}
			}
			#img-jumbo{
				position: relative;
				img{
					position: absolute;
					bottom: 2rem;
					right: 0;
					width: 90%;
				}
			}
		}
	}
	// medium
	@media screen and (max-width: 767px) {
		#jumbotron{
			height: 300px;
			.row{
				#search-jumbo{
					position: relative;
					.content{
						position: absolute;
						bottom: 4rem;
						left: 50%;
						transform: translateX( -50%);
						h1{
							font-size: 2.75rem;
						}
					}
				}
			}
		}
	}
	// small
	@media screen and (max-width: 575px) {
		#jumbotron{
			height: 160px;
			.row{
				#search-jumbo{
					position: relative;
					.content{
						position: absolute;
						bottom: 4rem;
						left: 50%;
						transform: translateX( -50%);
						width: 80%;
						h1{
							font-size: 2.75rem;
						}
						#search-container{
							width: 100%;
							margin: 0;
						}
					}
				}
			}
		}
	}
</style>