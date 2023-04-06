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
		<img src="../assets/images/plane.png" alt="" id="plane-img">
		<div class="container h-100">
			<div class="row h-100">
				<div class="col-12 col-md-7 px-0 d-flex align-items-center" id="search-jumbo">
					<div class="content d-flex flex-wrap justify-content-center">
						<img src="../assets/images/title-img.png" alt="" id="title-img" class="d-none d-md-block img-fluid mb-2">
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
		position: relative;
		height: 65vh;
		margin-bottom: 3rem;
		background-color: #B7DDFB;
		#plane-img{
			height: 120px;
			position: absolute;
			top: 1rem;
			left: 2rem;
		}
		.row{
			#search-jumbo{
				.content{
					text-align:center;
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
	// lg
	@media screen and (max-width: 991px) {
		#jumbotron{
			height: 350px;
			#search-container{
				width: 400px;
			}
			#plane-img{
				height: 75px;
			}
		}
	}
	// medium
	@media screen and (max-width: 767px) {
		#jumbotron{
			height: 200px;
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
			#plane-img{
				height: 40px;
			}
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